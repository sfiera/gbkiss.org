Infrared Communication
======================

:lang: en
:slug: tech/infrared
:tags: tech

All GBKiss cartridges_ are capable of wireless communication over infrared.

.. _cartridges: {filename}/cart/index.rst

Physical Layer
--------------

At the physical layer, the sender sends data by turning the infrared LED in its cartridge on and off for a fixed period of time. There seem to be three different pulse lengths:

* 10 units (~75μs?): zero bit
* 18 units (~150μs?): one bit
* 35 units (~300μs?): stop bit

In addition, the sender and receiver can match their timing with a sync bit. To send a sync bit, both the sender and receiver:

1. Turn on their IR LEDs
2. Wait to detect the other’s IR LED is on
3. Turn off their IR LEDs
4. Wait to detect the other’s IR LED is off

Data Link Layer
---------------

There seem to be two different protocols for framing bytes.

The first protocol is used for handshaking. In this protocol, the following are sent in succession:

* 8 zero or one bits (payload)
* 1 stop bit
* 1 additional zero bit

A successful handshake consists of the following payloads:

* ``$AA`` (``%10101010``) from sender to receiver
* ``$55`` (``%01010101``; ``~$AA``) from receiver to sender
* ``$C3`` (``%11000011``) from sender to receiver
* ``$3C`` (``%00111100``; ``~$C3``) from receiver to sender

After handshaking is complete, a different framing protocol is used:

* 1 sync bit
* 8 zero or one bits (payload)
* 1 additional zero bit

Network Layer
-------------

Each time a sender communicates with a receiver, it initiates a handshake, then sends a packet with the following data:

* The literal bytes ``Hu`` (``$72``, ``$15``).
* The contents of its eight registers in the order ``falhedcb``.

Transport Layer
---------------

On the receiving side, a listening device runs a loop, accepting register packets. Each time it receives a packet, it checks the sent ``a`` register and executes the numbered command from the IR op table with the sent registers:

.. list-table::
   :widths: auto
   :header-rows: 1

   * * ID
     * IR command
     * Description
   * * ``$01``
     * IRCmdClose
     * Close connection successfully
   * * ``$02``
     * IRCmd01
     * Invoke trap_ ``$e6``
   * * ``$03``
     * IRCmdFileSearch
     * Invoke `FileSearch trap`_
   * * ``$04``
     * IRCmdFileWrite
     * Invoke `FileWrite trap`_
   * * ``$05``
     * IRCmd04
     * Invoke trap_ ``$ea``
   * * ``$06``
     * IRCmdFileNext
     * Invoke FileNext trap_
   * * ``$07``
     * IRCmdFileDelete
     * Invoke FileDelete trap_
   * * ``$08``
     * IRCmd07
     * Invoke trap_ $eb
   * * ``$09``
     * IRCmdRead
     * Read from remote cartridge memory
   * * ``$0A``
     * IRCmdReadSRAM
     * Read from remote cartridge SRAM
   * * ``$0B``
     * IRCmd0A
     * Invoke trap_ ``$ec``
   * * ``$0C``
     * IRCmdWrite
     * Write to remote cartridge memory
   * * ``$0D``
     * IRCmdWriteSRAM
     * Write to remote cartridge SRAM

.. _trap: {filename}trap.rst
.. _FileSearch trap: {filename}trap.rst#filesearch-6b
.. _FileWrite trap: {filename}trap.rst#filewrite-e9

The ``IRCmdRead`` and ``IRCmdWrite`` comands can read and write from anywhere in the remote Game Boy’s memory map, but:

*  Writes to ROM (the mapper) are not safe, as the active ROM bank should not be changed.
*  Reads and writes to VRAM may or may not be safe (needs verification).
*  Reads and writes to cartridge SRAM are not possible because the IR hardware cannot be mapped at the same time as cartridge SRAM.

The ``IRCmdReadSRAM`` and ``IRCmdWriteSRAM`` command variants work around the latter restriction.

Application Layer
-----------------

By convention, before software begins listening for infrared communication, it first writes 2 identifier bytes to a fixed location in memory, then calls IRListen.

When the sender initiates communication, it first issues an IRRead call for the identifier address and checks if the identifier bytes are expected. If not, it terminates the connection.

.. include:: ../epilog.rsti
