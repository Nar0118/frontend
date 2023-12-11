export interface IAnyReactComponent {
  lat: number;
  lng: number;
  text: string | undefined;
}

export type LocationType = Omit<IAnyReactComponent, "text">;
