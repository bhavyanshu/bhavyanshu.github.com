---
layout: post
title: "A quick guide on how to use Gnu Privacy Guard (gpg) to generate keys and distribute them"
description: "Learn how to use gpg to generate a public private key pair. Also, this will tell you a way to distribute your public key."
tags: ["gpg","pgp"]
change_frequency: "weekly"
priority: 0.8
date: 2014-11-27 10:05:23
---

# Overview

I am not gonna debate on whether you should encrypt your communications or not. That's your choice. Also this is not a tutorial on how PGP works or how does it encrypt your data. You can easily find these on web. One important thing I would like you to read is the [difference between PGP and GPG](http://www.differencebetween.net/technology/software-technology/difference-between-pgp-and-gpg/). Let me highlight key differences below in case the web page is lost

* PGP uses RSA and IDEA encryption algorithm whereas GPG uses NIST AES, Advanced Encryption Standard.
* Phil Zimmermann (Developer) wrote PGP. Symantec aquired PGP corp and hence Symantec owns PGP currently. Read more on it [here](http://philzimmermann.com/EN/findpgp/). GPG (developed by Werner Koch) is still free to use, free to distribute and free to modify. GPG can open and unencrypt any PGP and OpenPGP standards file.
* PGP stands for Pretty Good Privacy whereas GPG stands for Gnu Privacy Guard.

My post is a really simple cheatsheet for command line gpg which you can use for quick reference. Forgive me if i have missed out on anything. Better to mention in comments so that I update this post. Thanks!

## Using gpg

* **Generate Key**

		gpg --gen-key

	When it asks "What keysize do you want? (2048)", just type 4096. You can just go with the defaults for other values. One thing I wanna tell is that if it tells you that there isn't enough entropy, you should open a new terminal and type `ls -R /`. Let it execute and side by side you can do lot of I/O and utilize disk. That should be enough for gpg.

* **List keys** - Lists all the public keys

		gpg --list-keys

* **List Private Keys** - Lists all the private keys

		gpg --list-secret-keys

* **Editing your key** - Hepls in editing key

		gpg --edit-key yourEmailId

* **Adding multiple usernames** - Add new real name(username) to key

		gpg --edit-key yourEmailId

	Now you have entered the GPG shell

		Command> adduid
		Command> save

* **Set Primary uid** - Sets primary uid if multiple uids are in one key. Do as above to go to gpg shell.

		Command> uid 1
		Command> primary
		Command> save

* **Adding key to keyserver** - Upload/submit your public key to a keyserver

		gpg --keyserver subkeys.pgp.net --send-keys *keyID*

* **Get key from Keyserver** - Fetch anyone's public key from keyserver

		gpg --keyserver subkeys.pgp.net --recv-keys *authorKeyID*

* **Generating Fingerprint** - Generates a fingerprint (Less characters for easy verification)

		gpg --fingerprint > fingerprint

* **Import Public Key** - Attach someone's public key to your keyring

		gpg --import somepubkeyfile

	This adds the public key in somepubkeyfile to your public key ring.

* **Export Keys** - Export/Dump public and private keys to files

		gpg --export -a "Real Name that you entered" > public

		gpg --export-secret-key -a "Real Name that you entered" > private

* **Encrypting some file** - Lets you encrypt some data

		gpg -e -u "Real Name that you enetered" -r "Reciever Real Name" example.tar.gz

	-u option to specify which private key you want to use
	-r option to specify which public key you want to use (You must have that public key first)
	example.tar.gz is the file I want to encrypt. It will generate example.tar.gz.gpg file which is the only file you need to send to the reciever. 	

* **Decrypting some file** - Lets you decrypt data

		gpg -d example.tar.gz.gpg > example.tar.gz

It will automatically choose your secret key and will prompt you for your password. It generates a example.tar.gz file.

* **Delete Key Pair** - Deletes your public and associated secret key

		gpg --delete-secret-and-public-keys "Real Name that you entered"

* **Revocation Certificate** - Generates revocation certification

		gpg --gen-revoke

	It creates a revocation certificate which means that when you will distribute this revocation certificate to keyserver, it will know that your respective key is no longer a valid key. This can also be achieved using

		gpg --edit-key "Real Name You entered"

	The uid will be marked with *. For that uid, you can revoke using
	Command> revuid

	and then finally update your key on keyserver using

		gpg --keyserver subkeys.pgp.net --send-keys *keyID*

{% include JB/setup %}
