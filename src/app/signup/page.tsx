import SignupForm from "@/components/auth/signup-form";

export default function Signup() {
  return (
    <div className="md:max-w-3xl max-w-[85%] mx-auto my-auto">
      <h1 className="font-semibold text-2xl my-4">Create your account.</h1>
      <SignupForm />
    </div>
  );
}
