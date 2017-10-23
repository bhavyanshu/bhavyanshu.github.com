---
layout: post
title: "Sorting in Ruby - Make Algorithms Great Again"
description: "Some of the important sorting algorithms implemented in Ruby"
category:
tags: ["Ruby"]
change_frequency: "weekly"
priority: 0.8
date: 2017-09-24 23:08:08
---

## Bubble Sort

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
------------

## Insertion Sort

Basic implementation of Insertion Sort

```ruby
class InsertionSort
  def initialize(arr)
    @list = arr
  end

  def sort
    for i in (1..@list.length - 1)
      key = @list[i]
      j = i-1

      # Compare and move elements according to key,
      # to one position ahead
      while j >= 0 && key < @list[j] do
          @list[j+1] = @list[j]
          j = j-1
      end
      @list[j+1] = key
    end
    @list
  end

end
```

### How to use

```ruby
arr = Array.new(50) { rand(1...9) }
is = InsertionSort.new(arr)
result = is.sort
```

### Rspec

```ruby
describe InsertionSort do

  it "is sorting from least to greatest" do
    arr = Array.new(50) { rand(1...9) }
    is = InsertionSort.new(arr)
    result = is.sort
    expect(result).to eq(arr)
  end

  it "has smallest integer at the beginning" do
    arr = Array.new(50) { rand(1...9) }
    is = InsertionSort.new(arr)
    expect(is.sort).to start_with 1
  end

end
```

{% include JB/setup %}
