#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>

const int ARR_SIZE = 100;

void search(int file_flag, char * argv[], char line[], char prev_line[]);
void search_file(int file_flag, char * argv[], char line[], char prev_line[]);
void size_error(int size, char * argv[]);

// file_flag => print to standard output (1) or file (2)
int main(int argc, char * argv[]) {
	int file_flag = 0;
	char line[100];
	char prev_line[100];
	if (argc == 1) {
		search(file_flag, argv, line, prev_line);
	}
	else if (argc == 2) {
		if ((strcmp(argv[1], "-") == 0)) {
			search(file_flag, argv, line, prev_line);
		}
		else {
			prev_line[0] = '\0';
			file_flag = 1;
			search_file(file_flag, argv, line, prev_line);
		}
	}
	else if (argc == 3) {
		if (strcmp(argv[1], "-") == 0) {
			if (strcmp(argv[2], "-") == 0) {
				search(file_flag, argv, line, prev_line);
			}
			else {
				file_flag = 2;
				search(file_flag, argv, line, prev_line);
			}
		}
		else {
			file_flag = 2;
			search_file(file_flag, argv, line, prev_line);
		}
	}
	else if (argc >= 4) {
		char message [ARR_SIZE];
		strcpy(message, argv[0]);
		strcat(message, ": does not accept more than 3 arguments.\n");
		if (write(STDOUT_FILENO, message, strlen(message))) {
			perror("write");
			exit(EXIT_FAILURE);
		}
		exit(EXIT_FAILURE);
	}
	return EXIT_SUCCESS;
}

void search(int file_flag, char * argv[], char line[], char prev_line[]) {
	int file_write;
	if (file_flag == 2) {
		file_write = creat(argv[2], 0664);
		if (file_write == -1) {
			perror("creat");
			exit(EXIT_FAILURE);
		}
	}
	ssize_t charas_read;
	while ((charas_read = read(STDIN_FILENO, line, ARR_SIZE)) > 0) {
		size_error(strlen(line), argv);
		line[charas_read] = '\0';
		if (strcmp(prev_line, line) == 0) {
			continue;
		}
		if (write(STDOUT_FILENO, line, charas_read) == -1) {
			perror("write");
			exit(EXIT_FAILURE);
		}
		if (file_flag == 2) {
			if (write(file_write, line, charas_read) == -1) {
				perror("write");
				exit(EXIT_FAILURE);
			}
		}
		memset(prev_line, '\0', ARR_SIZE);
		strncpy(prev_line, line, charas_read);
		memset(line, '\0', ARR_SIZE);
	}
	if (charas_read == -1) {
		perror("read");
		exit(EXIT_FAILURE);
	}
	if (file_flag == 2) {
		if (close(file_write) == -1) {
			perror("close");
			exit(EXIT_FAILURE);
		}
	}
}

void search_file(int file_flag, char * argv[], char line[], char prev_line[]) {
	char single_chara;
	int i = 0;
	ssize_t charas_read;
	int file_write;
	if (file_flag == 2) {
		file_write = creat(argv[2], 0664);
		if (file_write == -1) {
			perror("creat");
			exit(EXIT_FAILURE);
		}
	}
	int file_desc = open(argv[1], O_RDONLY);
	if (file_desc == -1) {
		perror("open");
		exit(EXIT_FAILURE);
	}
	while ((charas_read = read(file_desc, &single_chara, 1)) > 0) {
		size_error(i, argv);
		if (single_chara == '\n') {
			line[i] = single_chara;
			i++;
			line[i] = '\0';
			i++;
			if (strcmp(prev_line, line) == 0) {
				i = 0;
			}
			else {
				if (file_flag == 2) {
					if (write(file_write, line, i) == -1) {
						perror("write");
						exit(EXIT_FAILURE);
					}
				}
				else if (write(file_flag, line, i) == -1) {
					perror("write");
					exit(EXIT_FAILURE);
				}
				memset(prev_line, '\0', ARR_SIZE);
				strcpy(prev_line, line);
				memset(line, '\0', ARR_SIZE);
				i = 0;
			}
		}
		else {
			line[i] = single_chara;
			i++;
		}
	}
	if (charas_read == -1) {
		perror("read");
		exit(EXIT_FAILURE);
	}
	if (file_flag == 2) {
		if (close(file_write) == -1) {
			perror("close");
			exit(EXIT_FAILURE);
		}
	}
	if (close(file_desc) == -1) {
		perror("close");
		exit(EXIT_FAILURE);
	}
}

// Lines cannot be greater than 100 characters
void size_error(int size, char * argv[]) {
	if (size >= ARR_SIZE) {
		char message[ARR_SIZE];
		strcpy(message, argv[0]);
		strcat(message, ": input greater than ARR_SIZE\n");
		if (write(STDERR_FILENO, message, strlen(message)) == -1) {
			perror("write");
			exit(EXIT_FAILURE);
		}
		else {
			exit(EXIT_FAILURE);
		}
	}
}
