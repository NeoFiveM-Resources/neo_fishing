import {Component, inject, type OnDestroy, type OnInit} from '@angular/core';
import {NuiService} from '../../../../lib/hooks/nui.service';
import {fetchNui} from '../../../../lib/utils/fetchNui';

@Component({
    selector: 'app-example',
    imports: [],
    templateUrl: './example.component.html',
    styleUrl: './example.component.css',
})
export class ExampleComponent implements OnInit, OnDestroy {
    nuiService = inject(NuiService);
    visible = false;

    private handler = (data: any) => {
        console.log('Data received from NUI:', data);
        this.visible = data.visible || false;
    };

    buttonClick() {
        fetchNui('exit').then(
            () => {
                console.log('Exit NUI');
                this.visible = false;
            },
            (error) => {
                console.error('Error exiting NUI:', error);
            }
        );
    }

    ngOnInit() {
        this.nuiService.useNuiEvent('setVisible', this.handler);
    }

    ngOnDestroy() {
        this.nuiService.removeNuiEvent('setVisible', this.handler);
    }
}
