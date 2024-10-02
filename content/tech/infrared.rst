Infrared Communication
======================

:lang: en
:slug: tech/infrared
:tags: tech

All GBKiss cartridges_ are capable of wireless communication over infrared.

.. _cartridges: {filename}/cart/index.rst

Physical Layer
--------------

At the physical layer, infrared communication is handled by turning the infrared LED in each cartridge on and off for a fixed period of time. There seem to be three different pulse lengths:

* 10 units: zero bit
* 18 units: one bit
* 35 units: stop bit

Data Link Layer
---------------

There seem to be two different protocols for framing bytes.

The first protocol is used for handshaking. In this protocol, the following are sent in succession:

* 8 zero or one bits
* 1 stop bit
* 1 additional zero bit

After handshaking is complete, a different framing protocol is used:

* Some synchronization between devices (TBD)
* 8 zero or one bits
* 1 additional zero bit

Network Layer
-------------

Each time a sending device communicates with a receiving device, it initiates a handshake, then sends a packet with the following data:

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
