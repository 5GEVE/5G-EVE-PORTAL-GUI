# Portal Catalogue installer

This playbook will install and execute EVE GUI.

## Requirements

Ansible must be installed on your system:

```sh
apt install software-properties-common
apt-add-repository --yes --update ppa:ansible/ansible
apt install ansible
```

## Configuration

Ansible playbook variables, such as working directory and default user, can be configured through the deploy.yml file.

Eve GUI can be configured through environment files inside `/roles/portal_gui/files`.
The default configuration is 'environments.ts'.
If you want to use a different file, make sure to modify the entry in 'deploy.yml'

## Deployment Information

To execute the playbook:

```sh
ansible-playbook deploy.yml -K
```

This will install the following:
- Apache2
- NodeJs
- Angular 9

To clean the deployment:

```sh
ansible-playbook clean-deploy.yml -K
```