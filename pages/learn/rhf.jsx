import React, { useState } from "react";
import { useForm } from "react-hook-form";

const rhf = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <div>
          <input
            defaultValue="test"
            {...register("example", {
              required: "Please fill in this message",
            })}
          />
          {errors.example && <span>{errors.example?.message}</span>}
        </div>
        <div>
          {/* include validation with required or other standard HTML validation rules */}
          <input {...register("exampleRequired", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}
        </div>
        <div>
          <select
            {...register("gender", {
              required: "Select your sex please",
            })}
          >
            <option value="">Please Select</option>
            <option value="female">female</option>
            <option value="male">male</option>
          </select>
          {errors.gender && (
            <p style={{ color: "red" }}> {errors.gender?.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("firstName", {
              required: "Please enter first name",
              onChange: (e) => console.log(e.target.value),
              value: "Bill",
            })}
            placeholder="Enter First Name"
          />
          {errors.firstName && <p> {errors.firstName?.message}</p>}
        </div>
        <input type="submit" />
      </form>
    </>
  );
};

export default rhf;
