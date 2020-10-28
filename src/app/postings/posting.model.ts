export class Posting {
  id: string;
  name: string;
  city: string;
  country: string;
  department: string;

  constructor(id: string, name: string, city: string, country: string, department: string) {
      this.id = id;
      this.name = name;
      this.city = city;
      this.country = country;
      this.department = department;
  }
}
