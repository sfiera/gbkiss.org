Compression
===========

:lang: en
:slug: tech/compression
:tags: tech

GBKiss data may be compressed with a lookback-based algorithm. Compressed data contains 1-bit flags, 8-bit literals, 8-bit source addresses, and 4-bit copy lengths. Flags and copy lengths are packed into single bytes. Decompression maintains a 256-byte lookback buffer, starting at offset ``0xEF``.

Decompression
-------------

The following pseudo-code will decompress data to bytes:

.. code-block:: c

   uint8_t buffer[0x100] = {};
   uint8_t dst = 0xEF;
   while (!eof()) {
       if (read(flags, 1)) {
           buffer[dst] = read(literals, 8);
           write(buffer[dst++]);
       } else {
           uint8_t src = read(sources, 8);
           for (i in range(2 + read(lengths, 4))) {
               buffer[dst] = buffer[src++];
               write(buffer[dst++]);
           }
       }
   }

In the above code, ``read(q, b)`` is assumed to read a byte from the input and return it ``b`` bits at a time across subsequent calls for the same ``q`` until all 8 bits in the byte have been consumed:

.. code-block:: c

   uint8_t read(queue q, int bits) {
      if (!q->bits) {
          q->byte = read_byte();
          q->bits = 8;
      }
      uint8_t result = q->byte & ((1 << bits) - 1);
      q->byte >>= bits;
      q->bits -= bits;
      return result;
   }
