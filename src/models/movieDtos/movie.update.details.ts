export class MovieUpdateDetails {
  name!: string;
  description!: string;
  status!: number;
  quality!: number;
  allowingAge!: number;
  releaseDate!: string;
  countryId!: string;
  isDelete!: boolean;
  categoryIds!: string;
  participantIds!: string;

  constructor(
    name: string,
    description: string,
    status: number,
    quality: number,
    allowingAge: number,
    releaseDate: string,
    countryId: string,
    isDelete: boolean,
    categoryIds: string,
    participantIds: string
  ) {
    this.name = name;
    this.description = description;
    this.status = status;
    this.quality = quality;
    this.allowingAge = allowingAge;
    this.releaseDate = releaseDate;
    this.countryId = countryId;
    this.isDelete = isDelete;
    this.categoryIds = categoryIds;
    this.participantIds = participantIds;
  }
}
