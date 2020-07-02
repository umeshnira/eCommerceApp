import { Directive, HostListener, HostBinding, Output, EventEmitter } from '@angular/core';


@Directive({
    selector: '[appDnd]'
})

export class DragAndDropDirective {

    @HostBinding('class.fileover') fileOver: boolean;
    @Output() fileDropped = new EventEmitter<any>();

    constructor() { }

    @HostListener('dragover', ['$event']) onDragOver(event) {

        event.preventDefault();
        console.log('drag over');
        this.fileOver = true;
    }

    @HostListener('dragleave', ['$event']) public onDragLeave(event) {

        event.preventDefault();
        console.log('drag leave');
    }

    @HostListener('drop', ['$event']) public ondrop(event) {

        event.preventDefault();
        this.fileOver = false;
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            this.fileDropped.emit(files);
            console.log(`drop ${files.length} files`);
        }
    }
}
