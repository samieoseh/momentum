export interface UserRegistrationData {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface DoctorRegistrationData {
  medicalLicenseNumber: string;
  yearsOfExperience: number;
  userId: string;
  specialization: string;
  subdomain: string;
}
