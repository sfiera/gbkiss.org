Blocks
======

:lang: en
:slug: tech/blocks
:tags: tech

Description
-----------

GBKiss files are stored in cartridge RAM (CRAM) in one or more 8KiB-byte banks. All known GBKiss-compatible cartridges contain 32KiB of CRAM, and reserve some amount of this storage for game save data, leaving the remainder for GBKiss.

Blocks
------

Storage sizes are reported to users in units of “Blocks”, which are 256 bytes each. However, file storage is tracked byte-by-byte. Each file’s block size is reported as 1+floor(bytes/256).

.. _Kiss Mail: {filename}/file/kiss-mail.rst

.. include:: ../epilog.rsti
