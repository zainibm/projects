# uniq
A program that mimics the shell `uniq` command by omitting repetitive lines.

## Commands
`gcc my_uniq.c -o my_uniq` compiles the `.c` program. <br>
`.\my_uniq .\sample.txt` runs the program using `sample.txt` as input. <br>
`.\my_uniq - .\sample.txt` runs the program using standard input and prints non-omitted lines to `.\sample.txt`. <br>
`.\my_uniq - -` runs the program using standard input and prints non-omitted lines to standard output.

## Sample
| sample.txt |
|------------|
| hello |
| hello |
| beep |
| boop |
| boop |
| beep |
| goodbye |
| goodbye |
| goodbye |

```
$ .\my_uniq .\sample.txt
$ hello
  beep
  boop
  beep
  goodbye
```