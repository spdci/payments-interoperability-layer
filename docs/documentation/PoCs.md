# PoCs
This is a developer guide to building and deploying reports for the reporting REST service that is part of the deployment at the Hub.

### Pre-requisites
- Please make sure that you have the following softwares installed
  - git
  - docker
  - minikube
  - kubectl
  - helm
  - mysql-client

### Install K8S
- Start minikube K8S cluster with the following command
  ```
  minikube start --driver=docker --kubernetes-version=v1.21.5
  ```

### Clone the repository
- Download the repository
  ```
  git clone https://github.com/mojaloop/reporting.git
  cd reporting
  ```

### Deploy helm chart
- Install helm chart using the following commands
  ```
  helm dep up ./resources/test-integration/
  helm install test1 ./resources/test-integration/ --set reporting-legacy-api.image.tag=v11.0.0
  ```
- Wait for all the services to be up
  You can monitor the pods health or use the following commands to wait for the services
  ```
  kubectl -n default rollout status deployment test1-reporting-legacy-api
  kubectl -n default rollout status statefulset mysql
  ```

### Restore mysql database backup
- Port forward the mysql service
  ```
  kubectl port-forward -n default service/mysql 3306:3306
  ```
- Insert sample data into database. You can change the database name and filename in the following command as per your need.
  ```
  mysql -h127.0.0.1 -P3306 -uuser -ppassword default < ./resources/examples/participants_db_dump.sql
  ```

### Load reporting template
- Adding the custom resource using the following command
  ```
  kubectl apply -f resources/examples/participant_list.yaml
  ```

### Get the report
- Port forward the reporting service
  ```
  kubectl port-forward -n default service/test1-reporting-legacy-api 8080:80
  ```
- Get the report by opening the following URL in browser
  ```
  http://localhost/participant-list
  ```

### Cleanup
- Cleanup
  ```
  kubectl delete -f resources/examples/participant_list.yaml
  helm uninstall test1
  minikube stop
  ```

## Deploying to a production environment
There are multiple ways that a report custom resource can be deployed into an environment. The method that has been chosen and built into the IaC offering involves the use of a helm chart. (This aligns well with other Mojaloop components.)

The IaC enables both a public and a private deployment of reports. The process is identical except for the repository being private and residing within organisation's source control.
At a high level the process looks as follows:
1. Branch and commit changes to the repository where the report is deployed from.
2. Create a pull request and merge the changes into the master branch of the repository.
3. Create a new release on the repository. (Depending on configuration this typically kicks off a CICD mechanism that builds and publishes the helm package.)
4. Update the IaC to depoly the new helm release version for the reports.
5. Run the appropriate pipeline to perform the deployment.

