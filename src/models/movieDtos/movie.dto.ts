export class MovieDto {
  name!: string;
  description!: string;
  quality!: number;
  allowing_Age!: number;
  release_Date!: string;
  duration!: number;
  countryId!: string;
  categoryIds!: string;
  participantIds!: string;


  constructor(name: string, description: string, quality: number, allowing_Age: number, release_Date: string, duration: number, countryId: string, categoryIds: string, participantIds: string) {
    this.name = name;
    this.description = description;
    this.quality = quality;
    this.allowing_Age = allowing_Age;
    this.release_Date = release_Date;
    this.duration = duration;
    this.countryId = countryId;
    this.categoryIds = categoryIds;
    this.participantIds = participantIds;
  }
}
