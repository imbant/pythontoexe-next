export const codeMap: { title: string; tips: string; code: string }[] = [
  {
    title: "print love",
    tips: "Print a love message",
    code: `def print_love_message(name):
    print("".join([''.join([('Love'[(x-y) % len('Love')] if ((x*0.05)**2+(y*0.1)**2-1)**3-(x*0.05)**2*(y*0.1)**3 <= 0 else ' ') for x in range(-30, 30)]) for y in range(15, -15, -1)]))

print_love_message()
`,
  },
  {
    title: "bmi",
    tips: "Calculate and return the Body Mass Index (BMI)",
    code: `def calculate_bmi(weight, height):
    """Calculate and return the Body Mass Index (BMI)."""
    bmi = weight / (height ** 2)
    return bmi

# Get user input for weight and height
weight = float(input("Enter your weight in kilograms: "))
height = float(input("Enter your height in meters: "))

# Calculate BMI
bmi = calculate_bmi(weight, height)

# Display the result
print(f"Your BMI is: {bmi:.2f}")

# Additional: Interpret the BMI result based on WHO standards
if bmi < 18.5:
    print("You are underweight.")
elif bmi >= 18.5 and bmi < 25:
    print("You are of normal weight.")
elif bmi >= 25 and bmi < 30:
    print("You are overweight.")
else:
    print("You are obese.")
`,
  },
  {
    title: "guess number",
    tips: "Guess a number between 1 and 10",
    code: `import random

    def guess_number_game():
        number_to_guess = random.randint(1, 10)
        attempts_left = 3
        
        print("Welcome to the Guess the Number Game!")
        print("I'm thinking of a number between 1 and 10.")
        
        while attempts_left > 0:
            guess = int(input("Take a guess: "))
            
            if guess == number_to_guess:
                print("Congratulations! You guessed it right!")
                break
            elif guess < number_to_guess:
                print("Your guess is too low.")
            else:
                print("Your guess is too high.")
            
            attempts_left -= 1
            print(f"You have {attempts_left} attempts left.")
        
        if attempts_left == 0:
            print(f"Sorry, you've run out of attempts. The number was {number_to_guess}.")
    
    # To play the game, just call the function
    guess_number_game()
    `,
  },
];
