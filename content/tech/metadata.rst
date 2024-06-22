Metadata
========

:lang: en
:slug: tech/metadata
:tags: tech

All GBKiss files contain some amount of metadata. A minimal file could contain just a header of 6 bytes and a short file name, while a maximal file could consume over 256 bytes just for metadata.

.. list-table::
   :widths: auto

   * * Section
     * Req.
     * Size
     * Notes
   * * File size
     * Y
     * 2
     * Total, including this field
   * * Flags_
     * Y
     * 1
     *
   * * `Cartridge code`_
     * Y
     * 1
     *
   * * Title+Icon size
     * Y
     * 1
     *
   * * `Creator code`_
     * Y
     * 1
     *
   * * Title
     * Y
     * 1-12
     * Uses `rich text encoding`_
   * * Icon_
     * N
     * 96/192
     *
   * * History_
     * N
     * 46
     *

.. _rich text encoding: {filename}text.rst#rich-text

Flags
-----

Flags contains the union of zero or more flags:

* ``%00010000``: if set, file has icon (2bpp or 1bpp, per next flag)
* ``%00001000``: if set, icon is 2bpp; if clear, icon is 1bpp
* ``%00000100``: file is executable
* ``%00000010``: file must be installed to `zero region`_
* ``%00000001``: file has history information

.. _zero region: {filename}storage.rst#region

Cartridge Code
--------------

A file may optionally have a cartridge code which restricts which cartridges can run it.

Each cartridge that supports GBKiss has an associated code, located at address ``$00:$0014``. If a file’s cartridge code is non-zero, it is restricted to run only on matching cartridges. On a non-matching cartridge, the GBKiss menu will display the file type as |cross|, and will not execute it.

The following cartridge codes are known:

* ``$01``: `Super B-Daman Fighting Phoenix <{filename}/cart/abdj/index.rst>`_
* ``$02``: `Pocket Bomberman <{filename}/cart/apoj/index.rst>`_
* ``$03``: `Nectaris GB <{filename}/cart/an5j/index.rst>`_
* ``$04``: `Dai-Kaiju Monogatari The Miracle of the Zone <{filename}/cart/amzj/index.rst>`_
* ``$05``: *unknown*
* ``$06``: `Pocket Family GB <{filename}/cart/hfaj/index.rst>`_
* ``$07``: `Robot Poncots Taikenban <{filename}/cart/artj/index.rst>`_
* ``$08``: Robot Poncots `Sun <{filename}/cart/hrej/index.rst>`_, `Star <{filename}/cart/hrcj/index.rst>`_, `Moon <{filename}/cart/h3uj/index.rst>`_, and `Comic BomBom <{filename}/cart/h5uj/index.rst>`_
* ``$fe``: `GBKiss Mini Games <{filename}/cart/akaj/index.rst>`_

Creator Code
------------

A file may have a creator code which associates it with other files. This code is used to determine the file’s icon, and in the case of data files, determines which software can open it.

The following creator codes are known:

*  ``$01``: `Kiss Mail <{filename}/file/kiss-mail/index.rst>`_
*  ``$03``: `Icon-Edit <{filename}/file/icon-edit/index.rst>`_
*  ``$04``: `Calculator <{filename}/file/calculator/index.rst>`_
*  ``$05``: `Sound Test <{filename}/file/sound-test/index.rst>`_
*  ``$43``: `Blackjack <{filename}/file/blackjack/index.rst>`_,
   `Poker <{filename}/file/poker/index.rst>`_,
   `Char Dump <{filename}/file/char-dump/index.rst>`_,
   `Delete All <{filename}/file/delete-all/index.rst>`_
*  ``$64``: `Puzzle Game <{filename}/file/puzzle-game/index.rst>`_
*  ``$65``: `Mogutte Nanbo <{filename}/file/mogutte-nanbo/index.rst>`_
*  ``$66``: `Magnets <{filename}/file/magnets/index.rst>`_
*  ``$67``: `SameGame <{filename}/file/samegame/index.rst>`_
*  ``$68``: `Shot <{filename}/file/shot/index.rst>`_
*  ``$69``: `Drive <{filename}/file/drive/index.rst>`_
*  ``$6a``: `Watch & Timer <{filename}/file/watch-and-timer/index.rst>`_
*  ``$6c``: `Slot <{filename}/file/slot/index.rst>`_
*  ``$6d``: `Cannon Ball <{filename}/file/cannon-ball/index.rst>`_
*  ``$6e``: `Kiss-Mon <{filename}/file/kiss-mon/index.rst>`_,
   `Kiss-Mon 2 <{filename}/file/kiss-mon-2/index.rst>`_
*  ``$70``: `Bakechu Relay <{filename}/file/bakechu-relay/index.rst>`_
*  ``$71``: `Binary <{filename}/file/binary/index.rst>`_
*  ``$72``: `Roulette <{filename}/file/roulette/index.rst>`_
*  ``$76``: `Alarm tone <{filename}/file/saita/index.rst>`_

Icon
----

If a file’s “has icon” flag is set, then it contains an icon following its title. The icon may be 2bpp or 1bpp depending on whether the “2bpp icon” flag is set or clear.

Icons are 32×24, stored in column-major order (``rgbgfx --columns``). 2bpp icons occupy 192 bytes, and 1bpp icons occupy 96 bytes.

If the file’s “has icon” flag is clear, the icon is determined as follows:

*  If the file’s `creator code`_ is ``$00``, then its title is rendered as text.
*  If the file’s creator code matches one of the built-in icons, that icon is used:

   * ``$01``: ``LETTER``
   * ``$81``: ``MAIL``
   * ``$40``: ``HIKOU0``
   * ``$41``: ``PUZZLE0``
   * ``$42``: ``KEN0``
   * ``$43``: ``CARD0``
   * ``$44``: ``MAP``
   * ``$45``: ``IE2``

*  If file’s ``creator_code & $7f`` matches another installed file, that file’s icon is used.
*  Otherwise, the broken file icon ``SIMULA1`` is used.

History
-------

.. list-table::
   :widths: auto

   * * Section
     * Size
     * Notes
   * * Points
     * 2
     *
   * * Author
     * 10
     * Uses `plain text encoding`_, padded with spaces
   * * Author points
     * 1
     *
   * * First-hand source
     * 10
     * Uses `plain text encoding`_, padded with spaces
   * * First-hand source points
     * 1
     *
   * * Second-hand source
     * 10
     * Uses `plain text encoding`_, padded with spaces
   * * Second-hand source points
     * 1
     *
   * * Third-hand source
     * 10
     * Uses `plain text encoding`_, padded with spaces
   * * Third-hand source points
     * 1
     *

.. _plain text encoding: {filename}text.rst#plain-text

.. include:: ../epilog.rsti
