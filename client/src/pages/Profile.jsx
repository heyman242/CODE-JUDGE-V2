import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";

import { Form } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    await customFetch.patch("/user/update-user", formData);
    toast.success("Profile updated successfully");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};

const Profile = () => {
  
  

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>

        <div className="form-center">
          <div className="form-row">
          
          </div>
          <FormRow type="text" name="name"  />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            
          />
          <FormRow type="email" name="email"  />
          <FormRow type="text" name="location"  />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
