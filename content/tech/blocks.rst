Blocks
======

:lang: en
:slug: tech/blocks
:tags: tech

Description
-----------

GBKiss files are stored in cartridge RAM (CRAM) in blocks of 256 bytes. All known GBKiss-compatible cartridges contain 32KiB of CRAM, but most use 24KiB for game storage and leave only 8KiB (64 blocks) to GBKiss. The exception is `GBKiss Mini Games`_, which dedicates all 32KiB (256 blocks) to GBKiss.

The last block of storage is attributed to the `Kiss Mail`_ app. It includes the owner metadata (name, number, and memo) along with lookup information for locating other files in storage.

.. _Kiss Mail: {filename}/file/kiss-mail.rst

.. include:: ../epilog.rsti
