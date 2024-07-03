Traps
=====

:lang: en
:slug: tech/trap
:tags: tech

GBKiss games use ``RST $08`` to call out to system functions, here referred to as “traps”. The byte following ``RST $08`` identifies the specific trap to invoke:

.. code-block:: ca65

   ; trap u8 (2 bytes)
   MACRO trap
       rst $08
       db \1
   ENDM

Listing
-------

ExitToMenu ($01)
~~~~~~~~~~~~~~~~

Parameters:

*  None

Exits the currently-running GBKiss software and returns to the menu.

MemCopy ($02)
~~~~~~~~~~~~~

Parameters:

*  ``bc``: copy length
*  ``de``: source address
*  ``hl``: destination address

Copies ``bc`` bytes from the memory region starting at ``de`` to the region starting at ``hl``. Seems to be VBlank-aware; it behaves differently when ``de`` or ``hl`` points to VRAM.

DrawLayout ($5C)
~~~~~~~~~~~~~~~~

Parameters:

*  ``hl``: address of layout data

Draws a “layout”, a shorthand for a sequence of alternating `DrawAt ($B8)`_ and `DrawString ($69)`_ traps. The layout data contains (x, y, str) repeated until a terminating ``$FF``:

.. code-block:: ca65

   db $08, $00, "TOP", $00
   db $07, $11, "BOTTOM", $00
   db $00, $09, "LEFT", $00
   db $0f, $09, "RIGHT", $00
   db $ff

DrawString ($69)
~~~~~~~~~~~~~~~~

Parameters:

*  ``hl``: address of ``$00``-terminated `rich text`_ string

Draws a sequence of tiles at the current pen position.

.. _rich text: {filename}text.rst#rich-text

IRListen ($72)
~~~~~~~~~~~~~~

Parameters:

*  Unknown

Begins listening for an infrared_ connection from another cartridge. Takes two identifying bytes, which are sent to any cartridge that opens a connection by calling `IROpen ($7C)`_.

.. _infrared: {filename}infrared.rst

IRClose ($73)
~~~~~~~~~~~~~

Parameters:

*  Unknown

Ends an infrared_ session started with `IROpen ($7C)`_.

IROpen ($7C)
~~~~~~~~~~~~

Parameters:

*  Unknown

Attempts to open an infrared_ connection to another cartridge that has called `IRListen ($72)`_. If the connection is successfully opened, provides the two identifying bytes that were set in the other cartridge. If successful, the caller should follow up with `IRSend ($7F)`_ and then `IRClose ($73)`_.

IRSend ($7F)
~~~~~~~~~~~~

Parameters:

*  ``hl``: source address on this cartridge?
*  ``de``: target address on other cartridge?
*  ``c``: transfer size?

Sends data from this cartridge to another, after a session has been successfully set up with `IROpen ($7C)`_ and `IRListen ($72)`_.

DrawAt ($B8)
~~~~~~~~~~~~

Parameters:

*  ``h``: horizontal position
*  ``l``: vertical position

Moves the current pen position. Affects the origin for future traps, such as `DrawChar ($BB)`_ and `DrawString ($69)`_.

DrawChar ($BB)
~~~~~~~~~~~~~~

Parameters:

*  ``a``: tile index

Draws a single tile at the current pen position.

.. include:: ../epilog.rsti
