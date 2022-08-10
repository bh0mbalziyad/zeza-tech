import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useRef,
  useState,
} from "react";
import * as yup from "yup";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FieldInputProps,
  FieldProps,
} from "formik";
import Grid from "@/components/Grid";
import { ValueService } from "ag-grid-community";

const fakeData: formData[] = [
  {
    name: "Cattle egret",
    email: "vpaddingdon0@wordpress.org",
    age: 1,
    phone1: "443-251-8286",
    phone2: "481-434-3844",
    gender: "m",
  },
  {
    name: "Ring dove",
    email: "sbardey1@studiopress.com",
    age: 2,
    phone1: "187-222-7625",
    phone2: "815-171-4465",
    gender: "m",
  },
  {
    name: "Uinta ground squirrel",
    email: "ajarrette2@spotify.com",
    age: 3,
    phone1: "179-338-1643",
    phone2: "883-104-4469",
    gender: "f",
  },
  {
    name: "American bison",
    email: "gconningham3@harvard.edu",
    age: 4,
    phone1: "241-262-0761",
    phone2: "941-750-3879",
    gender: "f",
  },
  {
    name: "Blue wildebeest",
    email: "sgranleese4@com.com",
    age: 5,
    phone1: "771-936-3641",
    phone2: "543-691-0291",
    gender: "f",
  },
];

export type formData = {
  name: string;
  email: string;
  age: number;
  phone1: string;
  phone2?: string;
  gender: "m" | "f" | "o";
};

const Home: NextPage = () => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const ageRegExp = /^[0-9\b]+$/;

  const emailRegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [savedData, setSavedData] = useState<formData[]>(fakeData);

  function validateAge(value: string) {
    let error;

    if(value === "") {
      error = "Age is required"
      return error;
    }

    if(!value.toLowerCase().match(ageRegExp)){
      error = "Please enter a valid age"
      return error;
    }
    const age = parseInt(value);
    if(age < 20 || age > 50) {
      error = "Age must be between 20 & 50"
      return error;
    }

    return error;
  }

  function validateEmail(email: string) {
    let error;
    if(email === ""){
      error = "Email is required"
      return error;
    }
    if (!email.toLowerCase().match(emailRegExp)) {
      error = "Please enter a valid email";
      return error;
    }
    if (isEmailTaken(email)) {
      error = "Email taken, please use another email"
      return error;
    }

    return error;
  }


  function isEmailTaken(email: string){
    return savedData.find(formEntry => formEntry.email === email)
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    // email: yup
    //   .string()
    //   .email("Please enter a valid email")
    //   .required("Email is required"),
    // age: yup
    //   .string()
    //   .required("Age is required")
    //   .matches(ageRegExp, "Please enter a valid age"),
    phone1: yup
      .string()
      .required("Primary phone is required")
      .matches(phoneRegExp, "Please enter a valid phone number"),
    phone2: yup
      .string()
      .notOneOf([yup.ref("phone1")], "Please use a different phone number")
      .matches(phoneRegExp, "Please enter a valid phone number")
      .notRequired(),
    gender: yup
      .string()
      .oneOf(["m", "f", "o"])
      .required("This field is required"),
  });

  return (
    <div>
      <Head>
        <title>Zeza Tech Submission</title>
      </Head>
      <div className="max-w-3xl px-3 mx-auto">
        <Formik
          initialValues={{
            name: "",
            email: "",
            age: "",
            phone1: "",
            phone2: "",
            gender: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const valueCopy = {
              ...values,
              age: parseInt(values.age),
              gender: values.gender as "m" | "f" | "o",
            };
            console.log(JSON.stringify(valueCopy));
            setSavedData((prevState) => [...prevState, valueCopy]);
            resetForm();
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form className="flex flex-col">
              {/* Name */}
              <div className="py-2">
                <Field
                  className="p-2 rounded-lg border-2 w-full border-gray-500 my-1 outline-none text-gray-600"
                  id="name"
                  name="name"
                  placeholder="Name*"
                />
                <ErrorMessage name="name">
                  {(msg) => (
                    <div className="pl-1 text-red-400 text-sm">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              {/* Email */}
              <div className="py-2">
                <Field
                  className="p-2 rounded-lg border-2 w-full border-gray-500 my-1 outline-none text-gray-600"
                  id="email"
                  name="email"
                  placeholder="Email*"
                  validate={validateEmail}
                />
                <ErrorMessage name="email">
                  {(msg) => (
                    <div className="pl-1 text-red-400 text-sm">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              {/* Age */}
              <div className="py-2">
                <Field placeholder="Age*" className="p-2 rounded-lg border-2 w-full border-gray-500 my-1 outline-none text-gray-600" id="age" name="age" validate={validateAge} />
                <ErrorMessage name="age">
                  {(msg) => (
                    <div className="pl-1 text-red-400 text-sm">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              {/* Phone 1 */}
              <div className="py-2">
                <Field
                  className="p-2 rounded-lg border-2 w-full border-gray-500 my-1 outline-none text-gray-600"
                  id="phone1"
                  name="phone1"
                  placeholder="Primary number*"
                ></Field>
                <ErrorMessage name="phone1">
                  {(msg) => (
                    <div className="pl-1 text-red-400 text-sm">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              {/* Phone 2 */}
              <div className="py-2">
                <Field
                  className="p-2 rounded-lg border-2 w-full border-gray-500 my-1 outline-none text-gray-600"
                  id="phone2"
                  name="phone2"
                  placeholder="Alternate number"
                ></Field>
                <ErrorMessage name="phone2">
                  {(msg) => (
                    <div className="pl-1 text-red-400 text-sm">{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <div className="py-2">
                <Field
                  className="p-2 py-3 w-full bg-white text-gray-600 rounded-lg border-2 border-gray-500 outline-none"
                  id="gender"
                  as="select"
                  name="gender"
                >
                  <option value="" disabled>
                    Gender
                  </option>
                  <option value="m">Male</option>
                  <option value="f">Female</option>
                  <option value="o">Other</option>
                </Field>
                <ErrorMessage name="gender">
                  {(msg) => (
                    <div className="pl-1 text-red-400 text-sm mt-2">{msg}</div>
                  )}
                </ErrorMessage>
              </div>
              <button
                className="bg-slate-600 w-min text-center py-3 px-8 rounded-lg self-center my-2"
                type="submit"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <Grid rowData={savedData} />
    </div>
  );
};

export default Home;
