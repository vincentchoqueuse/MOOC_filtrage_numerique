.DEFAULT_GOAL := all

clean:
	rm -rf *.pdf 
	rm -rf *.log
	rm -rf *.aux
	rm -rf *.svg

svg:
	$(foreach f, $(wildcard *.tex), \
	pdflatex -interaction=batchmode --aux-directory=temp $f; \
	echo convert $(basename $(f)).pdf to svg; \
	pdf2svg $(basename $(f)).pdf $(basename $(f)).svg)
	mv *.svg ../../img

all: svg
	