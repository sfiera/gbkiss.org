Chousoku Spinner
================

:lang: en
:slug: cart/ayyj
:tags: cart

* Original Title: スーパービーダマン ファイティングフェニックス
* Release Date: 1998-09-18
* Product Code: DMG-AYYJ-JPN
* Mapper_: HuC-1
* ROM Size: 4Mbit (512KiB)
* RAM Size: 256Kbit (32KiB)
* Storage_: N/A
* `Cartridge Code`_: ``$05``

Chousoku Spinner is a HuC-1 game, supporting infrared connectivity but not GBKiss. However, there is some evidence in the ROM to suggest that GBKiss support was considered for it. At location ``$0014`` in the ROM, where GBKiss stores cartridge metadata, there are four bytes:

.. code-block:: hexdump

   000014 05 03 80 bc

The first resembles a `cartridge code`_, and ``$05`` is otherwise a gap in the cartridge code sequence. The latter three resemble the address of a GBKiss `owner block`_, in `mapped space`_.

.. _owner block: {filename}/tech/storage.rst#owner
.. _mapped space: {filename}/tech/storage.rst#addresses

.. include:: ../../epilog.rsti
