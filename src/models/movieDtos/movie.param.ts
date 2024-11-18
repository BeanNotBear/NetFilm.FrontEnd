export class MovieParam {
  pageIndex: number = 1;
  pageSize: number = 6;
  searchTerm: string = "";
  status: number | null = null;
  quality: number | null = null;
  allowingAge: number | null = null;
  averageStar: number | null = null;
  country: string | null = null;
  category: string | null = null;
  participant: string | null = null;
  releaseDate: string | null = null;
  isDeleted: boolean | null = false;
  includes: string | null = null;
  sortBy: string | null = null;
  ascending: boolean | null = null;

  constructor(pageIndex: number, pageSize: number, searchTerm: string, status: number | null, quality: number | null, allowingAge: number | null, averageStar: number | null, country: string | null, category: string | null, participant: string | null, releaseDate: string | null, isDeleted: boolean | null, includes: string | null, sortBy: string | null, ascending: boolean | null) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.searchTerm = searchTerm;
    this.status = status;
    this.quality = quality;
    this.allowingAge = allowingAge;
    this.averageStar = averageStar;
    this.country = country;
    this.category = category;
    this.participant = participant;
    this.releaseDate = releaseDate;
    this.isDeleted = isDeleted;
    this.includes = includes;
    this.sortBy = sortBy;
    this.ascending = ascending;
  }


}
