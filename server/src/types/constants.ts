export type Payload = {
  id: string;
  role?: string;
};

export type Update = {
  title?: string;
  description?: string;
  price?: number;
};

export type Course = [
  {
    _id: string;
    createdBy: {
      _id: string;
    };
  }
];
