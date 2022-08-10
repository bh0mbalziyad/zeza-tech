import { render, fireEvent, within, waitFor} from "@testing-library/react";
import Home from "../src/pages/index";
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom";

describe("Form testing", () => {

  it("checks whether the form resets on successful submission", async () => {
    const mockSubmit = jest.fn();
    
    const {getByRole} = render(<Home mockSubmit={mockSubmit} />);
    
    const name = getByRole("textbox", {
      name: /add your name/i,
    });
    const email = getByRole("textbox", {
      name: /add an email address/i,
    });
  
    const age = getByRole("textbox", {
      name: /add your age/i,
    });
  
    const phone1 = getByRole("textbox", {
      name: /add your primary phone number/i,
    });
  
    const phone2 = getByRole("textbox", {
      name: /add an alternate phone number/i,
    });
  
    const gender = getByRole("combobox", {
      name: /select your gender/i,
    });
  
  
    const submitButton = getByRole('button', {
      name: /submit/i
    }) 
  
    await userEvent.type(name, "Ziyad");
    await userEvent.type(email, "zeebhombal@gmail.com");
    await userEvent.type(age, "21");
    await userEvent.type(phone1, "9967126041");
    await userEvent.type(phone2, "001231223");
    await userEvent.selectOptions(gender, within(gender).getByRole("option", {name: /other/i}))
  
    await userEvent.click(submitButton);
  
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    })
  })

  it("Check whether error messages show up", async () => {
    const {getByLabelText,findByTestId, getByTestId} = render(<Home />)
    const emailField = getByTestId('email');

    expect(emailField).toBeInTheDocument();

    type(emailField,"")

    // fireEvent.change(emailField, {target: {value: "zeebhombal@gmail.com"}})

    const emailError = await findByTestId("email-error")
    expect(emailError.innerHTML).toBe("Email is required")
  })
  
  it("Check whether email validation is working", async () => {
    const {getByLabelText,findByTestId, getByTestId} = render(<Home />)
    const emailField = getByTestId('email');

    expect(emailField).toBeInTheDocument();
    type(emailField, "vpaddingdon0@wordpress.org")

    const emailError = await findByTestId("email-error")
    expect(emailError.innerHTML).toBe("Email taken, please use another email")
  })
});


function type(element, text){
  fireEvent.blur(element);
  fireEvent.change(element, {target: {value: text}})
}