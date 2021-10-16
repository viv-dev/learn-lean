/*
Wrapper class for the overlayRef used to host a modal that provides a
'remote control' in order to be able to define conditions under which the modal
closes - e.g. on backdrop click events, location 'back' events

When the modal service instantiates a modal component, it creates a dependency injector for
this wrapper class so components intended to be used as modals can have this class declared
in their constructor and the dependency injector will inject this instance.
This allows the modal component to feed 'data' into the close function.

The component that initiated creation of this modal will also be able to store the same instance,
allowing it to suscribe to the onClosed observable and executing some logic based on its
return type.
*/

import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

// Defines the return data of the modal onClose observable
export interface ModalCloseEvent {
  type: string;
  data?: any;
}

export class ModalOverlayRef {
  // Observable that can emit data when the modal closes.
  private onClosed = new Subject<ModalCloseEvent>();
  onClosed$ = this.onClosed.asObservable();

  constructor(private overlayRef: OverlayRef) {
    // Subscribe to closing the modal on backdrop clicks
    this.overlayRef
      .backdropClick()
      .subscribe(() => this._close('backdropClick'));
  }

  // Public function that allows closing with data transfer
  close(data?: any, type = 'close'): void {
    this._close(type, data);
  }

  // Private function that executes additional close logic
  private _close(type, data?) {
    // Close the overlay
    this.overlayRef.dispose();

    // Emit the data if there was any
    this.onClosed.next({ type, data });

    // Complete the observable
    this.onClosed.complete();
  }
}
