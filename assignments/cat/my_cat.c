#include <stdlib.h>
#include <stdio.h>
#include <string.h>

const int ARR_SIZE = 100;

// argc = argument count
// argv = argument vector
int main(int argc, char * argv[]) {
    // Terminate unsuccessfully if file name was not provided
	if (argc == 1) {
		printf("%s: No file name provided\n", argv[0]);
		exit(EXIT_FAILURE);
	}
	else {
		int flag_found = 0, i = 1;
		FILE * my_file;
		if (strcmp(argv[1], "-E") == 0) {
			flag_found = 1;
			i++;
            // Terminate unsuccessfully if file name was not provided after the flag
			if (argc == i) {
				printf("%s: No file name provided\n", argv[0]);
				exit(EXIT_FAILURE);
			}
		}
        // Loop through parameterized files
		while (i < argc) {
			my_file = fopen(argv[i], "r");
			if (my_file == NULL) {
				printf("%s: %s: No such file or directory\n", argv[0], argv[i]);
				exit(EXIT_FAILURE);
			}
			else {
				int character;
                // Loop through each line until EOF is found
				while ((character = getc(my_file)) != EOF) {
                    // Append $ if -E flag was found
					if (flag_found) {
						if (character == '\n') {
							printf("$\n");
							continue;
						}
					}
					printf("%c", (char) character);
				}
				fclose(my_file);
			}
			i++;
		}
	}
	return EXIT_SUCCESS;
}
