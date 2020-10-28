export class Details {
  name: string;
  city: string;
  country: string;
  jobDescriptionTitle: string;
  jobDescriptionText: string;
  qualificationsTitle: string;
  qualificationsText: string;

  constructor(
    name: string,
    city: string,
    country: string,
    jobDescriptionTitle: string,
    jobDescriptionText: string,
    qualificationsTitle: string,
    qualificationsText: string) {
      this.name = name;
      this.city = city;
      this.country = country;
      this.jobDescriptionTitle = jobDescriptionTitle;
      this.jobDescriptionText = jobDescriptionText;
      this.qualificationsTitle = qualificationsTitle;
      this.qualificationsText = qualificationsText;
  }
}
