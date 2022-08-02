export interface IBaseResponse {
  motd: {
    msg: string;
    url: string;
  };
  success: boolean;
}

export type OmitResponse<T extends IBaseResponse> = Omit<T, 'motd'>;
