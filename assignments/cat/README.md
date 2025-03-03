# cat
A program that mimics the shell `cat` command by concatenating files and printing to standard output. <br>
The `-E` flag is implemented and displays a $ at the end of each line.

## Commands
`gcc my_cat.c -o my_cat` compiles the `.c` program <br>
`.\my_cat .\sample.txt` runs the program using `sample.txt` as a file to be concatenated. <br>
`.\my_cat -E .\sample.txt` runs the program using `sample.txt` as a file to be concatenated, appending a $ to the end of each line.

## Sample
| sample.txt |
|------------|
| hello |
| world |
| |

```
$ .\my_cat -E .\sample.txt
$ hello$
  world$
```