Infrared Communication
======================

:lang: en
:slug: tech/infrared
:tags: tech

All GBKiss cartridges_ are capable of wireless communication over infrared.

.. _cartridges: {filename}/cart/index.rst

Application Level
-----------------

At the application level, infrared communication is managed through four traps_:

*  `IRListen ($72) <{filename}trap.rst#irlisten-72>`_
*  `IROpen ($7C) <{filename}trap.rst#iropen-7c>`_
*  `IRSend ($7F) <{filename}trap.rst#irsend-7f>`_
*  `IRClose ($73) <{filename}trap.rst#irclose-73>`_

.. _traps: {filename}trap.rst

First, the receiver calls IRListen with two bytes that identify the application that is listening. Four values are known:

*  ``Hu``: `GBKiss menu <{filename}/file/menu/index.rst>`_?
*  ``BK``: `Bakechu Relay <{filename}/file/bakechu-relay/index.rst>`_
*  ``MT``: `Kiss-Mon <{filename}/file/kiss-mon/index.rst>`_
*  ``k2``: `Kiss-Mon 2 <{filename}/file/kiss-mon-2/index.rst>`_

Next, the sender calls the other three traps:

1. IROpen, to initiate the connection and receive the identifier bytes. If these match the intended receiver, it proceeds.
2. IRSend, with the local source address range and remote destination address (can this be repeated?)
3. IRClose, to terminate the connection (and return control to the receiver on the remote side?)

.. include:: ../epilog.rsti
