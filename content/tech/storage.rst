Storage
=======

:lang: en
:slug: tech/storage
:tags: tech

Description
-----------

GBKiss files are stored in cartridge RAM (CRAM) in one or more 8KiB-byte banks. All known GBKiss-compatible cartridges contain 32KiB of CRAM, and reserve some amount of this storage for game save data, leaving the remainder for GBKiss.

Addresses
---------

Two different types of addresses are used within GBKiss:

* “CRAM space” addresses (``$0000…$7FFF``). These are 2-byte addresses within the full CRAM space (32 KiB). For example, CRAM address ``$5678`` refers to the mapped address ``$02:$B678``
* “Mapped space” addresses (``$00:$A000…$03:$BFFF``). These are 2- or 3-byte addresses within the Game Boy memory map. For example, CRAM address ``$01:$BCDE`` refers to CRAM address ``$3CDE``. In the 2-byte form, the bank is implicit.

Blocks
------

Storage sizes are reported to users in units of “Blocks”, which are 256 bytes each. However, file storage is tracked byte-by-byte. Each file’s block size is reported as 1+floor(bytes/256).

.. _region:

Regions
-------

Each bank of CRAM used by GBKiss is divided into regions, each with a 6-byte header, arranged in a doubly-linked list. The “zero region” (the first region of each bank) begins at offset 2, or ``$A002`` in mapped space. The header contains:

*  1 byte: the region type:

   * ``$46`` (``F``), marking the region as free space
   * ``$5A`` (``Z``), marking a diamond (“zero”) file
   * ``$52`` (``R``), marking a circle (“regular”) file
   * ``$44`` (``D``), use presently unknown
   * ``$53`` (``S``), marking one of the two special regions (the Owner_ region and the `File Table`_ region)

*  1 byte: bitwise complement of the type.
*  2 bytes: the address of the previous region’s header, in mapped space. For the zero region, this may be garbage.
*  2 bytes: the address of the next region’s header, in mapped space. For the final region of each bank, this is ``$C000``.

The procedure for adding circle (“regular”) files is:

1. Find any free region with sufficient size.
2. Check if the region is large enough to subdivide (file size + 6).
3. If so, divide it in two so that the second region’s capacity equals the file’s size and continue operating on the second region.
4. Change the region’s type to ``$52``.
5. Change the region’s type complement to ``$AD`` (``$52 ^ $FF``).
6. Copy the file to the region.
7. Add the file’s address to the `file table`_.

The procedure for adding diamond (“zero”) files is:

1. Find a zero region with sufficient size.
2. Check if the region is large enough to subdivide (file size + 6).
3. If so, divide it in two so that the first region’s capacity equals the file’s size and continue operating on the first region.
4. Change the region’s type to ``$5A``.
5. Change the region’s type complement to ``$A5`` (``$5A ^ $FF``).
6. Copy the file to the region.
7. Add the file’s address to the `file table`_.

The procedure for removing files is:

1. Change the region’s type to ``$46``.
2. Change the region’s type complement to ``$B9`` (``$46 ^ $FF``).
3. If the previous region is also free space, merge the regions together.
4. If the next region is also free space, merge the regions together.
5. Remove the file’s address from the `file table`_.

Owner
~~~~~

The last region of the last bank contains the owner’s information:

*  6 bytes: region_ header
*  64 bytes: unknown data
*  10 bytes: owner’s name
*  12 bytes: owner’s number
*  36 bytes: owner’s memo, in 3 12-byte lines

File Table
~~~~~~~~~~

The second-to-last region of the last bank contains the file table, addressing all files. It contains a 6-byte region_ header, followed by 120 4-byte file table entries:

*  2 bytes: file’s address in CRAM space, or ``$0000`` for absent files
*  1 byte: ``$00`` for stored files, or ``$FF`` for `Kiss Mail`_
*  1 byte: file creator code

.. _Kiss Mail: {filename}/file/kiss-mail/index.rst

.. include:: ../epilog.rsti
