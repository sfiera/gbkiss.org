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

All GBKiss cartridges implement the same trap functionality, so software that is written against these traps can run on any cartridge.

.. contents::
   :local:

System
------

ExitToMenu ($01)
~~~~~~~~~~~~~~~~

Parameters:

*  None

Exits the currently-running GBKiss software and returns to the menu.

Utility
-------

MemCopy ($02)
~~~~~~~~~~~~~

Parameters:

*  ``bc``: copy length
*  ``de``: source address
*  ``hl``: destination address

Copies ``bc`` bytes from the memory region starting at ``de`` to the region starting at ``hl``. Seems to be VBlank-aware; it behaves differently when the start of the source or destination range starts in VRAM.

MemSet ($A6)
~~~~~~~~~~~~

Parameters:

*  ``bc``: count
*  ``e``: byte value
*  ``hl``: destination address

Copies ``bc`` instances of the byte ``e`` to the memory region starting at ``hl``.

ExtractInit ($62)
~~~~~~~~~~~~~~~~~

Parameters:

*  Unknown

Prepares to decompress_ data from memory. Sets up the lookback buffer and state variables so that ExtractData can proceed.

.. _decompress: {filename}compression.rst

ExtractData ($63)
~~~~~~~~~~~~~~~~~

Parameters:

*  Unknown

Extracts data to memory. Can be run multiple times on the same source buffer with different outputs.

RandInit ($8D)
~~~~~~~~~~~~~~

RandNext ($8E)
~~~~~~~~~~~~~~

StrConvInt ($A3)
~~~~~~~~~~~~~~~~

Parameters:

*  ``de``: integer to convert
*  ``hl``: destination buffer (size 6?)

Converts an unsigned 16-bit integer to decimal representation, left-padded to 5 characters with ``$20`` and terminated with a trailing ``$00``. The destination buffer must be at least 6 bytes long.

StrConvHex ($A4)
~~~~~~~~~~~~~~~~

Parameters:

*  ``de``: integer to convert
*  ``hl``: destination buffer (size 5?)

Converts an unsigned 16-bit integer to hexadecimal representation, left-padded to 4 characters and terminated with a trailing ``$00``. The destination buffer must be at least 5 bytes long.

Video
-----

LCDEnable ($B4)
~~~~~~~~~~~~~~~

Parameters:

*  ``a``: LCDC_ flags

Enables the LCD display and sets flags in LCDC. Always sets the most-significant bit (``LCDC_ON``) in ``a`` before writing to LCDC.

.. _LCDC: https://gbdev.io/pandocs/LCDC.html

LCDDisable ($B5)
~~~~~~~~~~~~~~~~

Parameters:

*  None

Waits until VBlank and then disables the LCD. Safe to call at any time.

Drawing
-------

DrawInit ($B3)
~~~~~~~~~~~~~~

Parameters

*  ``a``: initialization options

Readies the screen for drawing operations. Safely disables the LCD, then performs setup such as clearing the screen.

If bit 6 (``$20``) is clear, re-enables the LCD with the LCDC_ flags ``LCDC_BGON``, ``LCDC_OBJON``, and ``LCDC_OBJ16`` set before returning. If bit 6 is set, re-enabling the LCD is the caller’s responsibility.

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

DrawString ($69)
~~~~~~~~~~~~~~~~

Parameters:

*  ``hl``: address of ``$00``-terminated `rich text`_ string

Draws a sequence of tiles at the current pen position.

.. _rich text: {filename}text.rst#rich-text

DrawStringList ($6A)
~~~~~~~~~~~~~~~~~~~~

Parameters:

*  ``hl``: address of string list

Draws a sequence of `rich text`_ strings on consecutive lines. Each string is individually terminated by ``$00``, and the whole list is terminated by an additional ``$00``.

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

DrawBox ($58)
~~~~~~~~~~~~~

Parameters:

*  ``b``: width of box
*  ``c``: height of box
*  ``d``: left origin of box
*  ``e``: top origin of box

Draws a decorative box.

Audio
-----

AudioStop ($11)
~~~~~~~~~~~~~~~

Parameters:

*  None

Stops any music or sound that is currently playing.

AudioPlayMusic ($13)
~~~~~~~~~~~~~~~~~~~~

Parameters:

*  ``a``: ID of music track to play

Starts playing a music track from the current cartridge.

AudioPlaySound ($14)
~~~~~~~~~~~~~~~~~~~~

Parameters:

*  ``a``: ID of sound effect to play

Starts playing a sound effect from the current cartridge.

AudioSilence ($15)
~~~~~~~~~~~~~~~~~~

Parameters:

*  ``a``: bit mask of channels to silence (0–15)

Silences some of the Game Boy’s audio channels. The Nth channel is silenced if (1 << N) is set.

AudioGetMusic ($16)
~~~~~~~~~~~~~~~~~~~

Parameters:

*  None

Sets ``a`` to 1 if any music track is currently playing; otherwise 0.

AudioGetSound ($17)
~~~~~~~~~~~~~~~~~~~

Parameters:

*  None

Sets ``a`` to 1 if any sound effect is currently playing; otherwise 0.

AudioPause ($18)
~~~~~~~~~~~~~~~~

AudioSetVolume ($19)
~~~~~~~~~~~~~~~~~~~~

Parameters:

*  ``a``: global volume (0–7)

Sets the global audio volume.

AudioGetCount ($1A)
~~~~~~~~~~~~~~~~~~~

Parameters:

*  None

Sets ``d`` to the number of music tracks in the current cartridge and ``e`` to the number of sound effects.

Note that `Super B-Daman`_’s implementation appears to have a bug. Most callers of this trap check the cartridge ID before calling it, and use hard-coded numbers (27 music tracks, 56 sound effects) if the cartridge is Super B-Daman.

.. _Super B-Daman: {filename}/cart/abdj/index.rst

Infrared
--------

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

.. include:: ../epilog.rsti
