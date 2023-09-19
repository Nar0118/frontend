export interface PropsType {
  show: boolean;
  onHide: () => void;
  selectedDevice?: any;
  editDevice?: (event: any) => void;
}
