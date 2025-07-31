# 3DS Activity Log

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

1. Clone this repo
2. `cd src && mkdir in` (we will store the file from 3DS in here)
3. Get your `00000000` file (PTM savegame data)
   a. Copy the gm9 script (I bear no responsibility, ask smudge) and run it
   b. Or go to `nand:/data/<ID0>/sysdata/00010022/` and copy the `00000000` file to your computer at `src/in` (in your cloned (this) repo)
4. `cd ..` (go back to root of the cloned repo)
5. `git clone https://github.com/wwylele/3ds-save-tool.git` at the root of the (cloned) repo (to extract contents out of `00000000`)
6. `mkdir src/data` (will store extracted output here)
7. `cd 3ds-save-tool`
8. `python disa-extract.py ../src/in/00000000 ../src/data/`
9. See you have both the files in `src/data` (`PlayHistory.dat` and `Pedometer.dat`)

## Convert PlayHistory.dat to PlayHistory.csv

1. `cd src`
2. `python playhistory.py`
3. See you have your `data/playhistory.csv` file
4. Open the web ui and upload this csv file!

## Next target

Make a 3DS themed website (WIP)

## Credits (WIP)

For being to extract the data at all
https://github.com/wwylele/3ds-save-tool

Primary Title List
https://github.com/hax0kartik/3dsdb (a little bit modified)
https://github.com/ghost-land/3dsdb

For secondary title list
https://3dsdb.com/

Will use as an API
https://api.ghseshop.cc/
https://github.com/ghost-land/3dsdbapi

Had used but doesn't has titleids
https://db.universal-team.net/data/full.json

For homebrew titles (Will Use)
https://wiki.hacks.guide/wiki/User:ItsCrocoSwine/3DS_homebrew_title_information

Not Used yet
https://www.gamebrew.org/wiki/List_of_3DS_homebrew_applications

Has it all, but no title ids
https://www.gametdb.com/3DS/List
