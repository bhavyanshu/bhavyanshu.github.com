---
layout: post
title: "Bubble Sort in Ruby - Make Algorithms Great Again"
description: "The easiest sorting algorithm implemented in Ruby"
category:
tags: ["Ruby"]
change_frequency: "weekly"
priority: 0.8
date: 2017-09-24 23:08:08
---

### Algorithm

Here is the implementation of Bubble sort algorithm in Ruby

```ruby
class BubbleSort
  def initialize(arr)
    @list = arr
  end

  def sort
    swapped = true
    begin
      swapped = false
      for i in 0..@list.length-1
        if @list[i+1]
          if @list[i] > @list[i+1]
            @list[i] = @list[i] + @list[i+1]
            @list[i+1] = @list[i] - @list[i+1]
            @list[i] = @list[i] - @list[i+1]
            swapped = true
          end
        end
      end
    end until !swapped
    @list
  end

end

```


### How to use

```ruby
arr = Array.new(20) { rand(1...9) }
bs = BubbleSort.new(arr)
result = bs.sort
```

### Rspec

```ruby
describe BubbleSort do

  it "is sorting from least to greatest" do
    arr = Array.new(50) { rand(1...9) }
    bs = BubbleSort.new(arr)
    result = bs.sort
    expect(result).to eq(arr)
  end

  it "has smallest integer at the beginning" do
    arr = Array.new(50) { rand(1...9) }
    bs = BubbleSort.new(arr)
    expect(bs.sort).to start_with 1
  end

end
```

{% include JB/setup %}
