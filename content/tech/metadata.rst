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

Each game that supports GBKiss has an associated code:

* ``$01``: `Super B-Daman Fighting Phoenix <{filename}/cart/abdj/index.rst>`_
* ``$02``: `Pocket Bomberman <{filename}/cart/apoj/index.rst>`_
* ``$03``: `Nectaris GB <{filename}/cart/an5j/index.rst>`_
* ``$04``: `Dai-Kaiju Monogatari The Miracle of the Zone <{filename}/cart/amzj/index.rst>`_
* ``$05``: *unknown*
* ``$06``: `Pocket Family GB <{filename}/cart/hfaj/index.rst>`_
* ``$07``: *unknown*
* ``$08``: Robot Poncots `Sun <{filename}/cart/hrej/index.rst>`_, `Star <{filename}/cart/hrcj/index.rst>`_, `Moon <{filename}/cart/h3uj/index.rst>`_, and `Comic BomBom <{filename}/cart/h5uj/index.rst>`_
* ``$fe``: `GBKiss Mini Games <{filename}/cart/akaj/index.rst>`_

If a file’s cartridge code is non-zero, and it is installed to a non-matching cartridge, it will display an X in the GBKiss menu, and will not execute.

Creator Code
------------

A file may have a creator code which associates it with other files.

If the creator code is ``$00``, then it is not associated with other files. If it lacks an embedded icon, the name of the file will be shown in place of an icon.

Icon
----

If a file’s “has icon” flag is set, then it contains an icon following its title. The icon may be 2bpp or 1bpp depending on whether the “2bpp icon” flag is set or clear.

Icons are 32×24, stored in column-major order (``rgbgfx --columns``). 2bpp icons occupy 192 bytes, and 1bpp icons occupy 96 bytes.

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
