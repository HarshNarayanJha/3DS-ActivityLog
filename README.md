# 3DS Playtime Browser

> [!WARNING]
> The README below is WIP, might contain random notes.

https://3dbrew.org/wiki/System_SaveData

This clearly lists the Playtime data is in the `nand:/data/<ID0>/sysdata/00010022/`

I was being dumb and searched in `0x00020202 	0x00020212 	0x00020222 	Activity Log application savegame` only to find `pld.dat` containing the app's save

Now I have the `Pedometer.dat` and `PlayHistory.dat` files

Parsing Pedometer.dat has been unsuccessful so far, PlayHistory.dat is a success

https://www.3dbrew.org/wiki/PTM_Savegame

Thanks to TollyH https://gbatemp.net/threads/playhistory-dat-timestamp.580853/post-10297936

and https://gbatemp.net/threads/playhistory-dat-timestamp.580853/post-10085500 for the gm9 script

## Steps to get your .dat files

1. Copy the gm9 script (I bear no responsibility, ask smudge) and run it
2. Or go to `nand:/data/<ID0>/sysdata/00010022/` and copy the `00000000` file to your computer
3. `git clone https://github.com/wwylele/3ds-save-tool.git`
4. go in
5. `python disa-extract.py path/to/00000000 ./src/data`
6. See you have both the files

## Next target

Make a 3DS themed website
