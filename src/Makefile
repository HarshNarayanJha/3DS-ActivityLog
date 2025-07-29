bin:
	mkdir bin

%: %.c bin
	clang -o bin/$@ $<
	./bin/$@

clean:
	rm -r bin/
