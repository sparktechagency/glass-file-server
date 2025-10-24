import z from "zod";

const updateUserManagementData = z.object({
  body: z.object({
    isBan: z.boolean({ required_error: "isBan is required" }),
  }),
});

export const dashboardUserManagementValidation = {
  updateUserManagementData,
};
