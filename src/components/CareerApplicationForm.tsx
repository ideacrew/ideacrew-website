import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface CareerApplicationFormProps {
  roleParam: string;
}

export default function CareerApplicationForm({
  roleParam,
}: CareerApplicationFormProps) {
  const [currentRole, setCurrentRole] = useState(roleParam);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneDisplay: "",
    authUS: false,
    sponsorship: false,
    i9: false,
    coverLetter: null as File | null,
    resume: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  // Track whether a field has been blurred at least once
  const touchedFields: Record<string, boolean> = {
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    resume: false,
    authUS: false,
    sponsorship: false,
    i9: false,
  };

  // Update role from URL parameters and page title
  useEffect(() => {
    const updateRoleFromQuery = () => {
      const params = new URLSearchParams(window.location.search);
      const roleFromQuery = params.get("role");
      if (roleFromQuery && roleFromQuery !== currentRole) {
        setCurrentRole(roleFromQuery);
        // Update page title
        document.title = `Applying for ${roleFromQuery} | ${document.title.replace(/^Applying for [^|]+ \| /, "").replace(/^.* \| /, "")}`;
        // Update breadcrumb if it exists
        const bcRole = document.getElementById(
          "bc-role"
        ) as HTMLAnchorElement | null;
        if (bcRole) {
          const from = params.get("from");
          if (from) {
            bcRole.href = from;
          }
          bcRole.textContent = roleFromQuery;
        }
      }
    };

    updateRoleFromQuery();
  }, [currentRole]);

  const formatPhone = (digits: string) => {
    const p1 = digits.slice(0, 3);
    const p2 = digits.slice(3, 6);
    const p3 = digits.slice(6, 10);
    if (digits.length <= 3) return p1;
    if (digits.length <= 6) return `(${p1}) ${p2}`;
    return `(${p1}) ${p2}-${p3}`;
  };

  const validateField = (name: string, value: any) => {
    let error = "";

    switch (name) {
      case "firstName":
      case "lastName":
        if (!value || value.trim() === "") {
          error = "This field is required.";
        }
        break;
      case "email":
        if (!value || value.trim() === "") {
          error = "This field is required.";
        } else if (
          !/^[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)\.)+[A-Za-z]{2,63}$/.test(
            value
          )
        ) {
          error = "Please enter a valid email address.";
        }
        break;
      case "phone":
        if (!value || value === "") {
          error = "This field is required.";
        } else if (!/^\d{10}$/.test(value)) {
          error = "Enter a valid 10-digit U.S. number.";
        }
        break;
      case "resume":
        if (!value) {
          error = "This field is required.";
        }
        break;
      case "authUS":
      case "sponsorship":
      case "i9":
        if (!value) {
          error = "This field is required.";
        }
        break;
    }

    return error;
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));

    // For phone display, also update the hidden phone field
    if (name === "phoneDisplay") {
      const digits = value.replace(/\D+/g, "").slice(0, 10);
      setFormData(prev => ({
        ...prev,
        phoneDisplay: formatPhone(digits),
        phone: digits,
      }));
    }

    // Validate field if it has been touched
    if (touched[name]) {
      const error = validateField(
        name,
        name === "phoneDisplay" ? formData.phone : value
      );
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const value =
      name === "phoneDisplay"
        ? formData.phone
        : formData[name as keyof typeof formData];
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleFileChange = (name: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [name]: file }));
    if (touched[name]) {
      const error = validateField(name, file);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
    if (touched[name]) {
      const error = validateField(name, checked);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Check form validity
  useEffect(() => {
    const isValid =
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      /^[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)\.)+[A-Za-z]{2,63}$/.test(
        formData.email
      ) &&
      formData.phone.length === 10 &&
      formData.authUS &&
      formData.sponsorship &&
      formData.i9 &&
      formData.resume !== null;

    setIsFormValid(isValid);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to show validation errors
    const allTouched = Object.keys(touchedFields).reduce(
      (acc, key) => {
        acc[key] = true;
        return acc;
      },
      {} as Record<string, boolean>
    );
    setTouched(allTouched);

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      if (key !== "phoneDisplay" && key !== "coverLetter") {
        const error = validateField(
          key,
          formData[key as keyof typeof formData]
        );
        if (error) newErrors[key] = error;
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("form-name", "careerApplication");
      formDataToSubmit.append("role applied for", currentRole);
      formDataToSubmit.append("first name", formData.firstName);
      formDataToSubmit.append("last name", formData.lastName);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("phone", formData.phone);
      formDataToSubmit.append(
        "authorized to work in the United States",
        formData.authUS.toString()
      );
      formDataToSubmit.append(
        "require employer sponsorship",
        formData.sponsorship.toString()
      );
      formDataToSubmit.append(
        "able to provide I-9 documentation by start date",
        formData.i9.toString()
      );

      if (formData.coverLetter) {
        formDataToSubmit.append("cover letter", formData.coverLetter);
      }
      if (formData.resume) {
        formDataToSubmit.append("resume", formData.resume);
      }

      await fetch("/", { method: "POST", body: formDataToSubmit });
      setIsSubmitted(true);
    } catch (error) {
      alert(
        "There was a problem submitting your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-md border border-green-200 bg-green-50 p-4 text-green-900">
        <p className="font-semibold">Thank you for applying!</p>
        <p>Your application has been processed. We appreciate your interest.</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      name="careerApplication"
      method="POST"
      encType="multipart/form-data"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="mt-6 grid grid-cols-1 gap-6"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="careerApplication" />
      <input type="hidden" name="role applied for" value={currentRole} />
      <p className="hidden">
        <label>
          Don't fill this out if you're human: <input name="bot-field" />
        </label>
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <Label
            htmlFor="firstName"
            className="mb-1 block text-sm font-medium text-[#0D2B46]"
          >
            First name{" "}
            <span className="text-red-600" aria-hidden="true">
              *
            </span>
          </Label>
          <Input
            id="firstName"
            name="first name"
            type="text"
            placeholder="First name"
            value={formData.firstName}
            onChange={e => handleInputChange("firstName", e.target.value)}
            onBlur={() => handleBlur("firstName")}
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600" aria-live="polite">
              {errors.firstName}
            </p>
          )}
        </div>
        <div>
          <Label
            htmlFor="lastName"
            className="mb-1 block text-sm font-medium text-[#0D2B46]"
          >
            Last name{" "}
            <span className="text-red-600" aria-hidden="true">
              *
            </span>
          </Label>
          <Input
            id="lastName"
            name="last name"
            type="text"
            placeholder="Last name"
            value={formData.lastName}
            onChange={e => handleInputChange("lastName", e.target.value)}
            onBlur={() => handleBlur("lastName")}
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600" aria-live="polite">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <Label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-[#0D2B46]"
          >
            Email address{" "}
            <span className="text-red-600" aria-hidden="true">
              *
            </span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={e => handleInputChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600" aria-live="polite">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <Label
            htmlFor="phoneDisplay"
            className="mb-1 block text-sm font-medium text-[#0D2B46]"
          >
            Phone number{" "}
            <span className="text-red-600" aria-hidden="true">
              *
            </span>
          </Label>
          <Input
            id="phoneDisplay"
            type="tel"
            placeholder="(555) 123-4567"
            value={formData.phoneDisplay}
            onChange={e => handleInputChange("phoneDisplay", e.target.value)}
            onBlur={() => handleBlur("phone")}
            maxLength={14}
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600" aria-live="polite">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <fieldset className="space-y-4">
        <legend className="mb-2 text-sm font-medium text-[#0D2B46]">
          Employment Authorization <span className="text-red-600">*</span>
        </legend>
        <p className="mb-4 text-xs text-gray-600">
          All checkboxes below are required to complete your application.
        </p>

        <div className="flex items-start gap-3">
          <Checkbox
            id="authUS"
            checked={formData.authUS}
            onCheckedChange={checked =>
              handleCheckboxChange("authUS", checked as boolean)
            }
            onBlur={() => handleBlur("authUS")}
            className={errors.authUS ? "border-red-500" : ""}
          />
          <Label htmlFor="authUS" className="text-sm text-[#0D2B46]">
            Are you legally authorized to work in the United States?
          </Label>
        </div>
        {errors.authUS && (
          <p className="mt-1 text-sm text-red-600" aria-live="polite">
            {errors.authUS}
          </p>
        )}

        <div className="flex items-start gap-3">
          <Checkbox
            id="sponsorship"
            checked={formData.sponsorship}
            onCheckedChange={checked =>
              handleCheckboxChange("sponsorship", checked as boolean)
            }
            onBlur={() => handleBlur("sponsorship")}
            className={errors.sponsorship ? "border-red-500" : ""}
          />
          <Label htmlFor="sponsorship" className="text-sm text-[#0D2B46]">
            Will you now or in the future require employer sponsorship for
            employment authorization (for example, H-1B, TN, E-3, O-1, or other
            work visa sponsorship)?
          </Label>
        </div>
        {errors.sponsorship && (
          <p className="mt-1 text-sm text-red-600" aria-live="polite">
            {errors.sponsorship}
          </p>
        )}

        <div className="flex items-start gap-3">
          <Checkbox
            id="i9"
            checked={formData.i9}
            onCheckedChange={checked =>
              handleCheckboxChange("i9", checked as boolean)
            }
            onBlur={() => handleBlur("i9")}
            className={errors.i9 ? "border-red-500" : ""}
          />
          <Label htmlFor="i9" className="text-sm text-[#0D2B46]">
            If offered employment, are you able to provide documentation
            establishing your identity and authorization to work in the United
            States, as required by the Form I-9 process, on or before your first
            day of work?
          </Label>
        </div>
        {errors.i9 && (
          <p className="mt-1 text-sm text-red-600" aria-live="polite">
            {errors.i9}
          </p>
        )}
      </fieldset>

      {/* Optional Cover Letter upload */}
      <div>
        <Label
          htmlFor="coverLetter"
          className="mb-1 block text-sm font-medium text-[#0D2B46]"
        >
          Upload cover letter <small> (PDF, DOC, DOCX, TXT, RTF)</small>
        </Label>
        <Input
          id="coverLetter"
          name="cover letter"
          type="file"
          accept=".pdf,.doc,.docx,.txt,.rtf"
          onChange={e =>
            handleFileChange("coverLetter", e.target.files?.[0] || null)
          }
        />
      </div>

      <div>
        <Label
          htmlFor="resume"
          className="mb-1 block text-sm font-medium text-[#0D2B46]"
        >
          Upload resume / CSV <small> (PDF, DOC, DOCX, TXT, RTF)</small>
          <span className="text-red-600" aria-hidden="true">
            *
          </span>
        </Label>
        <Input
          id="resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx,.txt,.rtf"
          onChange={e =>
            handleFileChange("resume", e.target.files?.[0] || null)
          }
          onBlur={() => handleBlur("resume")}
          className={errors.resume ? "border-red-500" : ""}
        />
        {errors.resume && (
          <p className="mt-1 text-sm text-red-600" aria-live="polite">
            {errors.resume}
          </p>
        )}
      </div>

      <div>
        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="bg-[#0D2B46] hover:bg-[#0A2238] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit application"}
        </Button>
      </div>
    </form>
  );
}
