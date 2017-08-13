---
layout: post
title: "Matrix operations using TensorFlow (Python)"
description: "Various matrix operations using open source python library called TensorFlow"
category: Tutorials
tags: ["Python", "TensorFlow"]
change_frequency: "weekly"
priority: 0.8
date: 2017-08-09 22:38:17
---

## Operations

Below are some of the examples that you can use to learn TensorFlow. There are some basic matrix and vector operations. You can check out the generated data flow graphs using the tensorboard command.

### Matrix Addition

```python
import tensorflow as tf

a = tf.Variable([[0,1], [2,3]], name="matrix_a")
b = tf.Variable([[2,4], [8,9]], name="matrix_b")
init = tf.variables_initializer([a, b], name="init")
x = tf.add(a, b)

with tf.Session() as s:
    writer = tf.summary.FileWriter('graphs', s.graph)
    s.run(init)
    print(s.run(x))

writer.close()
```

## Launch TensorBoard

You can launch TensorBoard using the following command. Open your browser and go to localhost:8082

`tensorard --logdir="./graphs" --port 8082`

{% include JB/setup %}
