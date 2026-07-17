import os
import struct

zip_path = r"c:\Users\rachi\Downloads\RKPR Website\RKPR_Phase3_RAG_Ready_AUDITED.zip"
out_dir = r"c:\Users\rachi\Downloads\RKPR Website\RKPR_Phase3_RAG_Ready_AUDITED"

os.makedirs(out_dir, exist_ok=True)

with open(zip_path, "rb") as f:
    data = f.read()

print(f"Total file size: {len(data)} bytes")

# Walk through data to find PK\x03\x04 (local file headers)
pos = 0
recovered = 0
errors = 0

while True:
    pos = data.find(b"PK\x03\x04", pos)
    if pos == -1:
        break
    
    try:
        # Read header fields
        # Local file header signature (4 bytes) - already found
        # Version needed to extract (2 bytes)
        # General purpose bit flag (2 bytes)
        # Compression method (2 bytes)
        # Last mod file time (2 bytes)
        # Last mod file date (2 bytes)
        # CRC-32 (4 bytes)
        # Compressed size (4 bytes)
        # Uncompressed size (4 bytes)
        # File name length (2 bytes)
        # Extra field length (2 bytes)
        
        header = data[pos:pos+30]
        if len(header) < 30:
            print(f"Truncated header at position {pos}")
            break
            
        sig, ver, flag, meth, mtime, mdate, crc, comp_size, uncomp_size, name_len, extra_len = struct.unpack(
            "<IHHHHHIIIHH", header
        )
        
        name_pos = pos + 30
        name = data[name_pos:name_pos+name_len].decode("utf-8", errors="ignore")
        
        extra_pos = name_pos + name_len
        data_pos = extra_pos + extra_len
        
        print(f"Found entry: {name} (Comp Size: {comp_size}, Uncomp Size: {uncomp_size}) at {pos}")
        
        # If it's a directory (ends with /), just create it
        if name.endswith("/"):
            os.makedirs(os.path.join(out_dir, name), exist_ok=True)
            pos = data_pos
            continue
            
        # For a file, read its compressed data
        comp_data = data[data_pos:data_pos+comp_size]
        if len(comp_data) < comp_size:
            print(f"Warning: file data truncated for {name}")
            comp_data = data[data_pos:]
            comp_size = len(comp_data)
            
        # Let's write it to disk
        out_path = os.path.join(out_dir, name.replace("/", os.sep))
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        
        # If compression method is 0 (stored), write directly
        if meth == 0:
            with open(out_path, "wb") as out_f:
                out_f.write(comp_data)
            print(f"Extracted (stored): {name}")
            recovered += 1
        elif meth == 8: # Deflated
            import zlib
            try:
                # Use -15 for wbits to ignore headers/trailers (raw deflate)
                decomp = zlib.decompress(comp_data, -15)
                with open(out_path, "wb") as out_f:
                    out_f.write(decomp)
                print(f"Extracted (deflated): {name}")
                recovered += 1
            except Exception as de:
                print(f"Error decompressing {name}: {de}")
                errors += 1
        else:
            print(f"Unsupported compression method {meth} for {name}")
            errors += 1
            
        pos = data_pos + comp_size
    except Exception as e:
        print(f"Error parsing entry at {pos}: {e}")
        errors += 1
        pos += 4

print(f"\nExtraction complete. Recovered: {recovered}, Errors: {errors}")
