# Payments Interoperability Layer
Payments Interoperability Layer to interact with Payment Execution Systems

## Documentation
The documentation is generated with `vuepress` framework and hosted by `git pages`

[Click Here](https://sp-convergence.github.io/payments-interoperability-layer/) for the hosted documentation.

----

### Contribution Guide
If you want to contribute to the documentation, please follow the below steps for setting up your local development environment

- Clone the repository
  ```
  git clone https://github.com/sp-convergence/payments-interoperability-layer.git
  ```
- Setup nvm and node
  ```
  cd docs
  nvm use
  ```
- Install dependencies
  ```
  npm install
  ```
- Start the development server
  ```
  npm run dev
  ```

Now, you should be able to open the webpage at `http://localhost:8080`

Every change you do in the `docs` folder should be reflected in the webpage immediately.

After you are done with the changes, you can rise a `Pull Request` to master branch and get it approved.

Once your changes are merged to `master` branch, the CICD (git actions) should publish the updated documentation.
