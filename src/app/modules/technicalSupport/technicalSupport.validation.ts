import z from "zod";

const createTechnicalSupportValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }).trim(),

    userName: z.string().trim().optional(),

    email: z.string({
      required_error: "Email is required",
    }).email("Invalid email address"),

    phone: z.string({
      required_error: "Phone is required",
    }).trim(),

    issueClassification: z.string({
      required_error: "Issue classification is required",
    }).trim(),

    description: z.string({
      required_error: "Description is required",
    }).trim(),

    dateAndTime: z.coerce.date({
      required_error: "Date and Time is required",
    }),

    deviceType: z.string({
      required_error: "Device type is required",
    }).trim(),

    browserApp: z.string({
      required_error: "Browser/App is required",
    }).trim(),

    impact: z.enum(["critical", "high", "medium", "low"], {
      required_error: "Impact is required",
    }),

    affectedUser: z.enum(
      ["justMe", "myTeam", "myDepartment", "mulipleDepartment", "entireOrganization"],
      { required_error: "Affected user is required" }
    ),

    receiveSupport: z.enum(["phone", "email"], {
      required_error: "Receive support method is required",
    }),

    scheduleCall: z.coerce.boolean({
      required_error: "Schedule call is required",
    }),

    digitalSignature: z.string().trim().optional(),

    DOB: z.coerce.date().optional(),
  }),
});

const updateTechnicalSupportValidation = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    userName: z.string().trim().optional(),
    email: z.string().email("Invalid email address").optional(),
    phone: z.string().trim().optional(),
    issueClassification: z.string().trim().optional(),
    description: z.string().trim().optional(),
    dateAndTime: z.coerce.date().optional(),
    deviceType: z.string().trim().optional(),
    browserApp: z.string().trim().optional(),
    attachment: z.array(z.string()).optional(),
    impact: z.enum(["critical", "high", "medium", "low"]).optional(),
    affectedUser: z.enum([
      "justMe",
      "myTeam",
      "myDepartment",
      "mulipleDepartment",
      "entireOrganization",
    ]).optional(),
    receiveSupport: z.enum(["phone", "email"]).optional(),
    scheduleCall: z.coerce.boolean().optional(),
    digitalSignature: z.string().trim().optional(),
    DOB: z.coerce.date().optional(),
  }),
});

export const TechnicalSupportValidation = {
  createTechnicalSupportValidation,
  updateTechnicalSupportValidation,
};
