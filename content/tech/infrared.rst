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
*  `IRRead ($7C) <{filename}trap.rst#irread-7c>`_
*  `IRWrite ($7F) <{filename}trap.rst#irwrite-7f>`_
*  `IRClose ($73) <{filename}trap.rst#irclose-73>`_

.. _traps: {filename}trap.rst

First, the receiver writes 2 identifier bytes to a fixed location in memory. Four values are known:

*  ``Hu`` (``$CE00``): `GBKiss menu <{filename}/file/menu/index.rst>`_
*  ``BK`` (``$CCC1``): `Bakechu Relay <{filename}/file/bakechu-relay/index.rst>`_
*  ``MT`` (``$CC9C``): `Kiss-Mon <{filename}/file/kiss-mon/index.rst>`_
*  ``k2`` (``$C860``): `Kiss-Mon 2 <{filename}/file/kiss-mon-2/index.rst>`_

Then, the receiver calls IRListen to start handling incoming connections.

Next, the sender calls the other three traps:

1. An initial IRRead call, to initiate the connection and receive the 2 identifier bytes. If these match the intended receiver, it proceeds.
2. Additional IRRead and IRWrite calls, with the source and destination address ranges.
3. A final IRClose, to terminate the connection and return control to the receiver on the remote side.

.. include:: ../epilog.rsti
