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

On the receiving side, a listening device runs a loop, accepting register packets. Each time it receives a packet, it checks the sent ``a`` register and executes the numbered command from the IR op table with the sent registers.

The most useful operations are:

* ``$00``: close connection successfully
* ``$08``: read from remote WRAM
* ``$0B``: write to remote WRAM

Application Layer
-----------------

By convention, before software begins listening for infrared communication, it first writes 2 identifier bytes to a fixed location in memory, then calls IRListen.

When the sender initiates communication, it first issues an IRRead call for the identifier address and checks if the identifier bytes are expected. If not, it terminates the connection.

.. include:: ../epilog.rsti
