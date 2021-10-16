import {
  Injectable,
  InjectionToken,
  Injector,
  ComponentRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import {
  ComponentPortal,
  ComponentType,
  PortalInjector,
  CdkPortal,
} from '@angular/cdk/portal';
import { ModalOverlayRef } from './modal.ref';

export const MODAL_DATA = new InjectionToken<any>('MODAL_DATA');

export interface ModalConfig<T = {}> {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  data?: T;
}

// If no config is passed to the 'open' function
// then this config is used
const DEFAULT_CONFIG: ModalConfig = {
  hasBackdrop: true,
  backdropClass: 'overlay',
  panelClass: '',
};

@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private cdkOverlay: Overlay, private injector: Injector) {}

  // To use this modal you have to use the cdkPortal directive on the ng-template
  // you want to use as a modal. Template modals cannot have the modalRef injected into them
  // therefore they must rely on event emitters to ask their parent to close them
  openTemplateModal(template: CdkPortal, config: ModalConfig = {}) {
    // If config is provided, overwrites default config with it
    const modalConfig = { ...DEFAULT_CONFIG, ...config };

    // Creates an overlay ref div with the provided config and appends
    // it to the end of the html body tag and returns the reference to it
    const overlayRef = this.createOverlay(modalConfig);

    // Create a ModalOverlayRef wrapper for Overlay to return
    const modalRef = new ModalOverlayRef(overlayRef);

    // Create an instance of the requested component and attach it to the overlay to display
    this.attachModalTemplate(template, overlayRef);

    // Return the modal ref object
    return modalRef;
  }

  // Function that takes a component type, creates a CDK overlay, creates an instance of the component
  // to be used as a modal as a CDK Portal, and attaches it to the PortalOutlet created by the Overlay.
  // Returns a ModalOverlayRef object that can be used to subscribe to close events and receive data back from the
  // instantiated modal
  openComponentModal<T>(
    component: ComponentType<T>,
    config: ModalConfig = {}
  ): ModalOverlayRef {
    // If config is provided, overwrites default config with it
    const modalConfig = { ...DEFAULT_CONFIG, ...config };

    // Creates an overlay ref div with the provided config and appends
    // it to the end of the html body tag and returns the reference to it
    const overlayRef = this.createOverlay(modalConfig);

    // Create a ModalOverlayRef wrapper for Overlay to return
    const modalRef = new ModalOverlayRef(overlayRef);

    // Create an instance of the requested component and attach it to the overlay to display
    this.attachModalComponent(component, overlayRef, modalRef, config.data);

    // Return the modal ref object
    return modalRef;
  }

  private createOverlay(config: ModalConfig) {
    const overlayConfig = this.createOverlayConfig(config);
    return this.cdkOverlay.create(overlayConfig);
  }

  // Extends the base Modal Config with overlay specific position
  // and scroll strategy parameters
  private createOverlayConfig(config: ModalConfig): OverlayConfig {
    // Create position config
    const position = this.cdkOverlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    // Create scroll config
    const scroll = this.cdkOverlay.scrollStrategies.block();

    // Merges the overlay specific config with any styling inputs
    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: scroll,
      positionStrategy: position,
    });

    return overlayConfig;
  }

  private attachModalTemplate(template: CdkPortal, overlayRef: OverlayRef) {
    // Attach the component to the overlay and return the component reference
    const modalComponentRef = overlayRef.attach(template);

    // Note: another potential method to extract data would be to return the componentRef instance
    // itself to the invoking component which would allow direct access to the modal components inputs/outputs
    return modalComponentRef;
  }

  private attachModalComponent<T>(
    component: ComponentType<T>,
    overlayRef: OverlayRef,
    modalRef: ModalOverlayRef,
    data?: any
  ) {
    // Create an injector to pass the modalRef to the modal component itself
    // Allows the component to close itself / provide data back
    const injector = this.createInjector(modalRef, data);

    // Create an instance of the component that will be displayed as a modal
    const modalPortal = new ComponentPortal(component, null, injector);

    // Attach the component to the overlay and return the component reference
    const modalComponentRef: ComponentRef<T> = overlayRef.attach(modalPortal);

    // Note: another potential method to extract data would be to return the componentRef instance
    // itself to the invoking component which would allow direct access to the modal components inputs/outputs
    return modalComponentRef;
  }

  // Creates an injector for providing specific instances of objects/classes
  // to the instantiated modal component
  private createInjector(
    modalRef: ModalOverlayRef,
    data?: object
  ): PortalInjector {
    const injectionTokens = new WeakMap();

    // Allows this modalRef to be injected into modal components constructor
    injectionTokens.set(ModalOverlayRef, modalRef);

    // Allows input data to be set on the modal component
    injectionTokens.set(MODAL_DATA, data);

    return new PortalInjector(this.injector, injectionTokens);
  }
}
